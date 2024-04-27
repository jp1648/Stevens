#!/bin/bash

#check if two args provided
if [ $# -ne 2 ]; then 
    echo "Usage: $0 <source_directory> <backup_directory>"
    exit 1
fi

#set the path variables
source_dir="$1"
backup_dir="$2"

#test if source directory exists
if [ ! -e "$source_dir" ]; then
    echo "Source directory does not exist: $source_dir"
    exit 3
fi

#test id backup directory exists, if not make it
if [ ! -e "$backup_dir" ]; then
    mkdir -p "$backup_dir"
fi

#Do the backup of the files
rsync -av --exclude='*/' "$source_dir" "$backup_dir"

echo "Backup completed successfully."
