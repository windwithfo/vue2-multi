#!/bin/bash
updir=./dist
todir=/opt/ftp2/vue/web/dist
ip=192.168.2.10
user=ftp2
password=1234

#on linux
#indexs=`find $updir -type d -printf $todir/'%P\n'| awk '{if ($0 == "")next;print "mkdir " $0}'`
#files=`find $updir -type f -printf 'put %p %P \n'`

#on osx
#first,you must install findutils.
#see:http://macappstore.org/findutils/
indexs=`gfind $updir -type d -printf $todir/'%P\n'| awk '{if ($0 == "")next;print "mkdir " $0}'`
files=`gfind $updir -type f -printf 'put %p %P \n'`

ftp -nv $ip <<EOF
user $user $password
type binary
prompt
$indexs
cd $todir
$files
quit
EOF
