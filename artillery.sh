#!/bin/bash

if [ "$1" == "--run" ]; then
  npx artillery run --output reports stress-test.yaml
elif [ "$1" == "--report" ]; then
  latest_report=$(ls -t reports | grep -E 'artillery_report_[0-9]{8}_[0-9]{6}\.json' | head -n 1)
  npx artillery report reports/$latest_report
else
  echo "Usage: $0 --run or --report"
fi
