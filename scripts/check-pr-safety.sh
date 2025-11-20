#!/bin/bash

#
# PR Safety Check Script
#
# This script detects potentially conflicting changes in a PR:
# - File deletions
# - File renames
# - Changes to files modified in the last 7 days by other branches
#
# Usage:
#   ./scripts/check-pr-safety.sh [base-branch]
#
# Exit codes:
#   0 - Safe (no conflicts detected)
#   1 - Unsafe (potential conflicts detected)
#

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_BRANCH="${1:-main}"
DAYS_THRESHOLD=7

echo -e "${BLUE}=== PR Safety Check ===${NC}"
echo -e "Base branch: ${BASE_BRANCH}"
echo -e "Checking for conflicts with changes in the last ${DAYS_THRESHOLD} days...\n"

# Ensure we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Fetch latest from origin
echo -e "${BLUE}Fetching latest from origin...${NC}"
git fetch origin "${BASE_BRANCH}" --quiet

# Get list of changed files with their status
echo -e "${BLUE}Analyzing changes...${NC}\n"

# Get file changes (A=added, M=modified, D=deleted, R=renamed)
CHANGES=$(git diff --name-status "origin/${BASE_BRANCH}...HEAD")

# Track issues
HAS_DELETIONS=false
HAS_RENAMES=false
HAS_CONFLICTS=false

DELETED_FILES=()
RENAMED_FILES=()
CONFLICTING_FILES=()

# Parse changes
while IFS=$'\t' read -r status file1 file2; do
    case "$status" in
        D*)
            HAS_DELETIONS=true
            DELETED_FILES+=("$file1")
            ;;
        R*)
            HAS_RENAMES=true
            RENAMED_FILES+=("$file1 -> $file2")
            ;;
    esac
done <<< "$CHANGES"

# Check for recently modified files
if [ -n "$CHANGES" ]; then
    # Get files modified in the last N days on the base branch
    RECENT_FILES=$(git log "origin/${BASE_BRANCH}" \
        --since="${DAYS_THRESHOLD} days ago" \
        --name-only \
        --pretty=format: \
        | sort -u \
        | grep -v '^$')

    # Get files changed in current branch
    CURRENT_FILES=$(git diff --name-only "origin/${BASE_BRANCH}...HEAD")

    # Find intersection (files changed both recently and in this PR)
    if [ -n "$RECENT_FILES" ] && [ -n "$CURRENT_FILES" ]; then
        while IFS= read -r file; do
            if echo "$CURRENT_FILES" | grep -q "^${file}$"; then
                HAS_CONFLICTS=true
                CONFLICTING_FILES+=("$file")
            fi
        done <<< "$RECENT_FILES"
    fi
fi

# Report findings
echo -e "${BLUE}=== Safety Check Results ===${NC}\n"

# Deletions
if [ "$HAS_DELETIONS" = true ]; then
    echo -e "${YELLOW}⚠️  Deletions Detected${NC}"
    echo -e "The following files will be deleted:"
    for file in "${DELETED_FILES[@]}"; do
        echo -e "  ${RED}- $file${NC}"
    done
    echo -e "\n${YELLOW}Warning: Deleting files may cause conflicts if other branches are using them.${NC}\n"
fi

# Renames
if [ "$HAS_RENAMES" = true ]; then
    echo -e "${YELLOW}⚠️  Renames Detected${NC}"
    echo -e "The following files will be renamed:"
    for file in "${RENAMED_FILES[@]}"; do
        echo -e "  ${YELLOW}↻ $file${NC}"
    done
    echo -e "\n${YELLOW}Warning: Renaming files may cause conflicts if other branches reference them.${NC}\n"
fi

# Conflicts with recent changes
if [ "$HAS_CONFLICTS" = true ]; then
    echo -e "${YELLOW}⚠️  Recently Modified Files${NC}"
    echo -e "The following files were modified in ${BASE_BRANCH} within the last ${DAYS_THRESHOLD} days:"
    for file in "${CONFLICTING_FILES[@]}"; do
        echo -e "  ${YELLOW}⚡ $file${NC}"
    done
    echo -e "\n${YELLOW}Warning: These files may have concurrent changes from other branches.${NC}\n"
fi

# Summary
echo -e "${BLUE}=== Summary ===${NC}\n"

if [ "$HAS_DELETIONS" = false ] && [ "$HAS_RENAMES" = false ] && [ "$HAS_CONFLICTS" = false ]; then
    echo -e "${GREEN}✓ No potential conflicts detected${NC}"
    echo -e "${GREEN}✓ This PR appears safe to merge${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Potential conflicts detected${NC}"
    echo -e "\n${YELLOW}Recommendations:${NC}"

    if [ "$HAS_DELETIONS" = true ] || [ "$HAS_RENAMES" = true ]; then
        echo -e "  • Coordinate with team before deleting/renaming files"
        echo -e "  • Check if other active branches depend on these files"
    fi

    if [ "$HAS_CONFLICTS" = true ]; then
        echo -e "  • Review recent changes to ensure compatibility"
        echo -e "  • Consider rebasing on latest ${BASE_BRANCH}"
        echo -e "  • Test thoroughly after merge"
    fi

    echo -e "\n${BLUE}Note: This is a warning, not a blocker. Proceed with caution.${NC}"

    # Exit with warning code (non-zero, but can be overridden in CI)
    exit 1
fi
