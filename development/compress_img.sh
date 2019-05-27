#!/bin/bash

DEVELOPMENT=app

echo "Crusing images & adjusting permissions..."

fixImgPermissions() {
    for file in $1/*.{png,jpg,jpeg,gif}
        do if [ -f $file ]
            #then echo "Crushing ${file##*/}..."
            then if [[ $file == *.png ]]
                #then echo "PNG Crushing ${file##*/}..."
                then sudo pngquant --ext "-tmp.png" ${file}
                mv ${file%.*}-tmp.png ${file}
            elif [[ $file == *.jpg ]]
                #then echo "JPG Crushing ${file##*/}..."
                then jpgcrush ${file}
            fi
            sudo chmod 775 ${file}
        fi
    done
}

directories=$(find $DEVELOPMENT -type d | awk '{print $0}')

while IFS=' ' read -ra dir; do
    for i in "${dir[@]}"; do
        fixImgPermissions $i
    done
done <<< "$directories"