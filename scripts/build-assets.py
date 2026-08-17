import os, re, glob, json, base64, io, shutil
from PIL import Image

SRC = '/home/claude/zipwork/raw/photos'
DST = '/home/claude/portfolio/public/images/projects'

# номер в архиве -> (группа, имя файла)
MAP = {
    # MARTINEZ
    1:('martinez','01-key-visual'), 2:('martinez','02-monogram'),
    3:('martinez','03-navigation'), 4:('martinez','04-be-not-seem'),
    5:('martinez','05-gym'), 6:('martinez','06-creatine-intro'),
    7:('martinez','07-creatine-pros'), 8:('martinez','08-creatine-cons'),
    9:('martinez','09-creatine-key-info'),
    # IDENTITIES
    39:('identities','elysian-gardens'), 28:('identities','sf-mark-apparel'),
    29:('identities','sf-mark'), 38:('identities','aethwawe'),
    32:('identities','sound-compass'), 25:('identities','monogram-03'),
    17:('identities','championpit'), 18:('identities','strong-energy'),
    19:('identities','se-monogram'), 22:('identities','motivation-cast'),
    23:('identities','cryptomnestia-a'), 24:('identities','cryptomnestia-b'),
    31:('identities','sport-power'), 33:('identities','fresh-bites'),
    36:('identities','eco-construction'),
    # VISUAL WORK
    44:('visual-work','nike-zoomx-concept'),
    42:('visual-work','car-fragrance'), 40:('visual-work','charging-cable'),
    41:('visual-work','flashlight'), 43:('visual-work','laser-scissors'),
    27:('visual-work','retouch-after'), 26:('visual-work','retouch-before'),
    15:('visual-work','russia-travel-a'), 16:('visual-work','russia-travel-b'),
    20:('visual-work','russia-secrets'),
    45:('visual-work','mertes-wide'), 47:('visual-work','mertes-square'),
    11:('visual-work','self-dont-waste-time'), 12:('visual-work','self-logotype'),
    13:('visual-work','self-services'), 14:('visual-work','self-the-one'),
    34:('visual-work','hobbies-2025'), 35:('visual-work','self-information'),
    37:('visual-work','self-first-clients'), 46:('visual-work','editing-for-lazy'),
}
# Исключены сознательно: 21 (побайтовый дубликат 20), 30 (чужое изображение)
EXCLUDED = {21: 'byte-identical duplicate of #20', 30: 'third-party celebrity likeness'}

def find(n):
    m = [f for f in glob.glob(f'{SRC}/photo_{n}@*.jpg') if '_thumb' not in f]
    return m[0] if m else None

manifest = {}
blur = {}
for n, (group, name) in sorted(MAP.items()):
    src = find(n)
    if not src:
        print('MISSING', n); continue
    im = Image.open(src).convert('RGB')
    w, h = im.size
    out = f'{DST}/{group}/{name}.jpg'
    shutil.copy2(src, out)           # оригинал не пересжимаем
    tiny = im.copy(); tiny.thumbnail((12, 12))
    buf = io.BytesIO(); tiny.save(buf, 'JPEG', quality=40)
    b64 = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
    key = f'/images/projects/{group}/{name}.jpg'
    blur[key] = b64
    manifest[key] = {'source': os.path.basename(src), 'archiveIndex': n,
                     'group': group, 'width': w, 'height': h,
                     'ratio': round(w/h, 3)}

json.dump(blur, open('/home/claude/portfolio/content/image-blur.json','w'), indent=0)
json.dump({'images': manifest, 'excluded': EXCLUDED},
          open('/home/claude/portfolio/content/image-manifest.json','w'),
          indent=2, ensure_ascii=False)
print('скопировано:', len(manifest))
for g in ['martinez','identities','visual-work']:
    print(' ', g, len([k for k,v in manifest.items() if v['group']==g]))
