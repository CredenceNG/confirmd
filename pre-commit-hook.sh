#!/bin/bash

# Pre-commit hook to prevent committing secrets
# To install: cp pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "🔍 Checking for secrets before commit..."

# Patterns to search for
PATTERNS=(
    "api_key|apikey|API_KEY|APIKEY"
    "secret|SECRET"
    "password|PASSWORD|pwd|PWD"
    "token|TOKEN"
    "xkeysib-"
    "[0-9a-f]{32,}"
    "sk_live_|sk_test_"
    "AKIA[0-9A-Z]{16}"
)

# Files to check (exclude .example files)
FILES=$(git diff --cached --name-only | grep -v "\.example$" | grep -v "pre-commit-hook.sh" | grep -v "SECURITY_ALERT.md")

FOUND_SECRETS=false

for file in $FILES; do
    if [[ -f "$file" ]]; then
        for pattern in "${PATTERNS[@]}"; do
            if grep -qE "$pattern" "$file"; then
                echo "🚨 POTENTIAL SECRET DETECTED in $file"
                echo "   Pattern: $pattern"
                grep -nE "$pattern" "$file" | head -3
                echo ""
                FOUND_SECRETS=true
            fi
        done
    fi
done

if [[ "$FOUND_SECRETS" == "true" ]]; then
    echo "❌ COMMIT BLOCKED: Potential secrets detected!"
    echo ""
    echo "If these are false positives, you can:"
    echo "1. Move secrets to .env files (which are gitignored)"
    echo "2. Use placeholder values in example files"
    echo "3. Skip this check with: git commit --no-verify"
    echo ""
    exit 1
fi

echo "✅ No secrets detected. Commit allowed."
exit 0
