#!/bin/sh
echo
git add ./docs
git commit --amend -C HEAD --no-verify
exit
