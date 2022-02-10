# Mirror of Yurii Neretin's homepage
Mirror of Yurii Neretin's homepage at https://www.mat.univie.ac.at/~neretin/

#### HTML view of .html pages

Notice! Some pages with no latin swymbols have custom encoding: cp1251 ant ect

https://htmlpreview.github.io/?https://github.com/levinandrey/neretin/blob/main/www.mat.univie.ac.at/_neretin/index.html

#### How to change encoding

```console
# Get file's encoding
file --mime-encoding 1968plus.html

# Cahnge encoding
iconv -f windows-1251 -t utf-8 index-copy.html > index.html
```




#### How to mirror whole website 

```console
httrack https://www.mat.univie.ac.at/\~neretin/

```

Wget commands


```console
wget --mirror            \
     --convert-links     \
     --html-extension    \
     --wait=2            \
     --recursive            \
     --adjust-extension            \
     --page-requisites            \
     --span-hosts            \
     -o log             \
     https://www.mat.univie.ac.at/\~neretin/

```
