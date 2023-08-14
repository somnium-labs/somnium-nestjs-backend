#!/bin/bash

npx artillery run --output reports stress-test.yaml

latest_report=$(ls -t reports | grep -E 'artillery_report_[0-9]{8}_[0-9]{6}\.json' | head -n 1)
npx artillery report reports/$latest_report
