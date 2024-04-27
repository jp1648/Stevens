
#!/bin/sh
#
NAME="Godzilla"
MONSTER=""
if [ "$NAME" != "Godzilla" ]; then
  echo Goodbye Tokyo!
fi
if [ -z "$MONSTER" ]; then
  echo Titan!
fi
if [ -n "$MONSTER" ]; then
  echo Monarch?
fi