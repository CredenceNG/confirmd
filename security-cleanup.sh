#!/bin/bash

# SECURITY CLEANUP SCRIPT
# This script removes sensitive files from Git tracking

echo "🚨 SECURITY CLEANUP - Removing sensitive files from Git tracking..."

# Remove .env files from Git tracking (but keep them locally)
echo "Removing .env files from Git tracking..."
git rm --cached server/.env 2>/dev/null || echo "server/.env already untracked"
git rm --cached client/.env 2>/dev/null || echo "client/.env already untracked"

# Remove documentation with secrets
echo "Removing EMAIL_SETUP.md from Git tracking temporarily..."
git rm --cached EMAIL_SETUP.md 2>/dev/null || echo "EMAIL_SETUP.md already untracked"

# Stage the updated .env.example and .gitignore
echo "Staging security fixes..."
git add server/.env.example
git add .gitignore
git add SECURITY_ALERT.md

echo "✅ Files removed from Git tracking"
echo ""
echo "Next steps:"
echo "1. Commit these changes: git commit -m 'Security: Remove secrets from repository'"
echo "2. IMMEDIATELY revoke all exposed API keys and credentials"
echo "3. Generate new credentials and update your local .env files"
echo "4. Consider using 'git filter-branch' to remove secrets from Git history"
echo ""
echo "🔴 CRITICAL: Revoke all exposed credentials NOW!"
