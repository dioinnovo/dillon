#!/bin/bash
QLIK_TENANT_URL="https://innovoco2.us.qlikcloud.com"
QLIK_API_KEY="eyJhbGciOiJFUzM4NCIsImtpZCI6ImU2NjQzNTM2LTJlNWMtNDZmZi1iYmMyLTcxNThiYjRhYzIwNSIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiSC14WWVUVV96d2hsODRPLVJseUNEb1ZpLTRBUlJoT2siLCJqdGkiOiJlNjY0MzUzNi0yZTVjLTQ2ZmYtYmJjMi03MTU4YmI0YWMyMDUiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiNjhiMGI4MWQ1OTNhY2E1ZWM2MTllOWZiIn0.NGQnAsvgqFIaTyTG1H1pXbTKXndxoOj5KgTU-_qofN5pFo8HabRgFMqmY_G58gJW5nX5UoIJ-Y0z1UOEmUw3BYFXglPel1Yizo6ZSdOycvvjhIOv0r8ddOMvDfur-zkO"
KB_ID="bce8f75e-7150-4d23-9a9a-fa601b5b0d76"

echo "=== Knowledge Base Details ==="
curl -s "${QLIK_TENANT_URL}/api/v1/knowledgebases/${KB_ID}" \
  -H "Authorization: Bearer ${QLIK_API_KEY}" | python3 -m json.tool

echo ""
echo "=== Knowledge Base Documents ==="
curl -s "${QLIK_TENANT_URL}/api/v1/knowledgebases/${KB_ID}/documents" \
  -H "Authorization: Bearer ${QLIK_API_KEY}" | python3 -m json.tool
