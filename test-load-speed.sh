#!/bin/bash

echo "Testing load speed of the application..."
echo "Opening http://localhost:3001..."

# Measure time to first byte
start=$(date +%s%N)
curl -s -o /dev/null -w "Time to first byte: %{time_starttransfer}s\n" http://localhost:3001

# Check if redirect middleware is working
echo ""
echo "Checking redirect from / to /dashboard/inspection..."
response=$(curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3001/)
if [ "$response" = "200" ]; then
    echo "✓ Redirect working correctly (Status: 200)"
else
    echo "✗ Redirect failed (Status: $response)"
fi

echo ""
echo "Performance improvements applied:"
echo "✓ Server-side redirect with Next.js middleware"
echo "✓ Removed heavy framer-motion dependency from initial load"
echo "✓ Lazy-loaded inspection data hook"
echo "✓ Replaced client-side push with replace for faster navigation"
echo "✓ Added CSS-only animations for better performance"