# This script organizes photos and videos in a specified directory into subdirectories based on their date taken.

import os
import shutil
from PIL import Image
from PIL.ExifTags import TAGS
import exifread

src_dir = r"D:\02-PersonalInfo\佳能\20260222"

def get_date_taken(filepath):
    try:
        with Image.open(filepath) as img:
            exif = img._getexif()
            if exif:
                for tag_id, value in exif.items():
                    tag = TAGS.get(tag_id, tag_id)
                    if tag == 'DateTimeOriginal':
                        return value.split(' ')[0].replace(':', '-')
    except Exception:
        pass
    
    try:
        with open(filepath, 'rb') as f:
            tags = exifread.process_file(f)
            for tag in tags:
                if 'DateTimeOriginal' in tag or 'Image DateTime' in tag:
                    val = str(tags[tag])
                    return val.split(' ')[0].replace(':', '-')
    except Exception:
        pass
    
    return None

def main():
    files = [f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.mp4'))]
    date_groups = {}
    
    print(f"Processing {len(files)} files...")
    
    for i, filename in enumerate(files, 1):
        filepath = os.path.join(src_dir, filename)
        date = get_date_taken(filepath)
        
        if date is None:
            date = "Unknown"
        
        if date not in date_groups:
            date_groups[date] = []
        date_groups[date].append(filename)
        
        if i % 100 == 0:
            print(f"Processed {i}/{len(files)} files...")
    
    print(f"\nFound {len(date_groups)} different dates:")
    for date, files_list in sorted(date_groups.items()):
        print(f"  {date}: {len(files_list)} files")
    
    print("\nMoving files...")
    for date, files_list in date_groups.items():
        date_dir = os.path.join(src_dir, date)
        os.makedirs(date_dir, exist_ok=True)
        
        for filename in files_list:
            src = os.path.join(src_dir, filename)
            dst = os.path.join(date_dir, filename)
            if os.path.exists(dst):
                base, ext = os.path.splitext(filename)
                counter = 1
                while os.path.exists(dst):
                    dst = os.path.join(date_dir, f"{base}_{counter}{ext}")
                    counter += 1
            
            shutil.move(src, dst)
            print(f"Moved: {filename} -> {date}/")
    
    print("\nDone!")

if __name__ == "__main__":
    main()
