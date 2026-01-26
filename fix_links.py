import os
import re
import urllib.parse

def fix_structure(root_dir):
    # Regex for standard markdown images: ![alt](url "title") or ![alt](url)
    # capturing the whole thing to replace it
    md_img_re = re.compile(r'(!\[.*?\]\((.*?)\))')
    
    # Regex for HTML images: <img src="url">
    html_img_re = re.compile(r'(<img[^>]+src=["\'](.*?)["\']>)')

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    try:
                        content = f.read()
                    except UnicodeDecodeError:
                         print(f"Skipping {file} due to encoding issue")
                         continue
                
                original_content = content
                
                # Find all markdown images
                for match in md_img_re.finditer(content):
                    full_match = match.group(0)
                    link = match.group(2).split()[0] # Handle title part if present
                    
                    if not check_link(link, root):
                        print(f"Removing broken link in {file}: {link}")
                        content = content.replace(full_match, '')

                # Find all HTML images
                for match in html_img_re.finditer(content):
                    full_match = match.group(0)
                    link = match.group(2)
                    
                    if not check_link(link, root):
                        print(f"Removing broken HTML image in {file}: {link}")
                        content = content.replace(full_match, '')
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)

def check_link(link, current_dir):
    # Ignore absolute URLs (http, https)
    if link.startswith('http://') or link.startswith('https://'):
        return True 
    
    # Ignore anchors
    if link.startswith('#'):
        return True
        
    # Decode URL encoding
    link = urllib.parse.unquote(link)
    
    # Construct absolute path
    abs_path = os.path.normpath(os.path.join(current_dir, link))
    
    return os.path.exists(abs_path)

if __name__ == "__main__":
    root_val = r"c:\src\github.com\paulparkinson\developer\multicloud-gcpagenticai-oracledb"
    fix_structure(root_val)
