sort $1 | uniq -c | awk '{ if ($1 != 1) { print } }'