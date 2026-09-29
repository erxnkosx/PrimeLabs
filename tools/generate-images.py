"""
Genereert de favicon, de app-iconen en de Open Graph-afbeeldingen (1200 x 630).

  src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png
      -> het P-teken, exact uitgesneden uit public/assets/img/primelabs-logo.webp
         (bronrechthoek 38,113 -> 348,522, zelfde uitsnede als .mark in style.css)
  public/og/*.jpg
      -> deelafbeelding per pagina (logo, kop, foto)

Gebruik:  pip install pillow   en daarna   npm run images:og
(npm install moet gedraaid hebben: de lettertypes komen uit node_modules/@fontsource).

Let op: gebruik op publieke pagina's geen beelden van cases die nog niet gepubliceerd zijn.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import pathlib
R=str(pathlib.Path(__file__).resolve().parent.parent)+'/'
IMG=R+'public/assets/img/'
F=R+'node_modules/@fontsource/'
def font(fam, w, size): return ImageFont.truetype(f'{F}{fam}/files/{fam}-latin-{w}-normal.woff', size)

logo=Image.open(IMG+'primelabs-logo.webp').convert('RGBA')
# ---------- icons: exact P-mark (38,113 → 348,522) ----------
mark=logo.crop((38,113,348,522))
def square(bg, size, pad):
    c=Image.new('RGBA',(size,size),bg)
    inner=size-2*pad
    m=mark.copy(); m.thumbnail((inner,inner), Image.LANCZOS)
    c.alpha_composite(m, ((size-m.width)//2,(size-m.height)//2))
    return c
square((0,0,0,0),512,40).save(R+'src/app/icon.png')
square((255,255,255,255),180,22).convert('RGB').save(R+'src/app/apple-icon.png')
ico=square((0,0,0,0),256,12)
ico.save(R+'src/app/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64)])

# ---------- Open Graph 1200x630 ----------
W,H=1200,630
INK=(22,21,23); MUTED=(110,108,117); BRAND=(58,7,138)
def grad_bar(w,h):
    g=Image.new('RGB',(w,h))
    stops=[(0,(0x61,0,0x85)),(0.46,(0x3a,0x07,0x8a)),(1,(0x14,0x07,0x92))]
    for x in range(w):
        t=x/(w-1)
        for i in range(len(stops)-1):
            a,ca=stops[i]; b,cb=stops[i+1]
            if a<=t<=b:
                u=(t-a)/(b-a); col=tuple(int(ca[k]+(cb[k]-ca[k])*u) for k in range(3)); break
        for y in range(h): g.putpixel((x,y),col)
    return g
def cover(im, w, h, fx=0.5, fy=0.5):
    s=max(w/im.width, h/im.height); im=im.resize((round(im.width*s), round(im.height*s)), Image.LANCZOS)
    x=int((im.width-w)*fx); y=int((im.height-h)*fy)
    return im.crop((x,y,x+w,y+h))
def og(name, photo, eyebrow, lines, fx=0.5, fy=0.5, zoom=1.0):
    c=Image.new('RGB',(W,H),(255,255,255))
    pw=720
    src=Image.open(IMG+photo)
    if photo == 'drone.webp':  # uitgesneden drone op een lavendel vlak
        bg=Image.new('RGBA',(pw,H),(238,234,246,255)); d0=src.copy(); d0.thumbnail((int(pw*0.9),H), Image.LANCZOS)
        bg.alpha_composite(d0,((pw-d0.width)//2+40,(H-d0.height)//2)); ph=bg.convert('RGB')
    else:
        big=cover(src.convert('RGB'), int(pw*zoom), int(H*zoom), fx, fy)
        ph=big.crop(((big.width-pw)//2,(big.height-H)//2,(big.width-pw)//2+pw,(big.height-H)//2+H))
    mask=Image.new('L',(pw,H),255); d=ImageDraw.Draw(mask)
    for x in range(260):
        d.line([(x,0),(x,H)], fill=int(255*(x/260)**1.6))
    c.paste(ph,(W-pw,0),mask)
    # subtle violet tint over photo edge
    dr=ImageDraw.Draw(c)
    lg=logo.copy(); lg.thumbnail((300,300), Image.LANCZOS)
    c.paste(lg,(64,58),lg)
    y=236
    c.paste(grad_bar(34,3),(64,y+11))
    dr.text((110,y), eyebrow.upper(), font=font('inter','600',19), fill=BRAND, spacing=0)
    y+=52
    tf=font('inter-tight','600',54)
    for ln in lines:
        dr.text((62,y), ln, font=tf, fill=INK); y+=60
    dr.text((64,H-70), 'primelabs.be  ·  Puurs-Sint-Amands, België', font=font('inter','500',21), fill=MUTED)
    c.save(R+f'public/og/{name}.jpg', quality=86, optimize=True, progressive=True)
og('home','broox-hero-2800.webp','Visuele inspectie vanuit de lucht',['Professionele','drone-inspecties.','Helder vastgelegd.'],0.62,0.45)
og('diensten','drone.webp','Onze diensten',['Gerichte','beeldregistratie voor','technische dossiers.'])
og('werkwijze','broox-hero-2800.webp','Werkwijze',['Van inspectievraag','naar helder dossier.'],0.7,0.3,1.5)
og('portfolio','broox-hero-2800.webp','Portfolio',['Inspectiewerk','helder in beeld.'],0.55,0.35,1.25)
og('offerte','broox-hero-2200.webp','Offerte aanvragen',['Vertel ons wat u','wilt laten','inspecteren.'],0.62,0.45)
og('case-dakinspectie','speculoos-case/dak-overzicht.webp','Case 01 · Dak- en gevelinspectie',['Een productiehal,','paneel voor paneel.'])
og('case-werfopvolging','werf-case/dag2-sloop.webp','Case 02 · Werfopvolging',['Een sloopwerf,','dag na dag.'])
og('case-woning-3d','woning-case/foto-overkapping.webp','Case 03 · Fotogrammetrie & 3D',['Een woning,','rondom in 3D.'])
print('Klaar:', sorted(os.listdir(R+'public/og')))
