# Makefile for rfcindex
testrfcbibfiles= testrfcbib-1.tex testrfcbib-2.tex

update: rfc-index-update rfc-index test publish

rfc-index-update:
	ncftpget ftp://ftp.rfc-editor.org/in-notes/rfc-index.xml
	gzip -f -9 rfc-index.xml

rfc-index: rfc-index.xml.gz
	gunzip -cd  rfc-index.xml.gz | xsltproc rfcxmlindex2bibtex.xslt - | sed -r \
	  -e 's/([\\_&%#$$])/\\\1/g # escape special TeX chars'  \
	  -e '/author=/s/([^ ]+[[:space:]]+(\(Ed.\)|3rd|Jr\.))/{\1}/g # correctly group surname extensions' \
	  -e "s/([^=])\"([^\"]*)\"/\1\`\`\2''/g # need to replace double quotes to TeX quotes in fields"  \
	  -e "/author=/s/([^\"]),/\1 and /g # special fix for excessive author list in single author field Y.Xu,S.Baba,T.Ayaki,T.Seki,A.Hameed" \
		>rfc.bib


#	gunzip -cd  rfc-index.xml.gz | xsltproc rfcxmlindex2bibtex.xslt - | sed -e 's/\([_&%#$$]\)/\\\1/g' -e '/author=/s/\([^ ]*\) \(3rd\|Jr\.\)/\{\1 \2\}/g' -e "/title=\"{.*\".*}\"/s/{\([^\"]*\)\"\([^\"]*\)\"\([^\"]*\)}/{\1\`\`\2\'\'\3}/" >rfc.bib

test: $(testrfcbibfiles)
	- rm *.aux
	for testfile in testrfcbib-?.tex ; do \
	latex $$testfile; \
	bibtex $${testfile%.tex}; \
	latex $$testfile; \
	latex $$testfile; \
	done

$(testrfcbibfiles): rfc.bib
	./mkcitations.pl <$^

publish: rfc.bib
	if [ -s rfc.bib ]; then \
	 	cp rfc.bib ../data ; \
		git commit -m "update RFC index `date -I'date'`" ../data/rfc.bib ; \
		GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa_gitauto -F /dev/null" git push ; \
	 	cp rfc.bib /tmhome/bless/public_html/ ; \
		gzip -f -9 -c <rfc.bib >/tmhome/bless/public_html/rfc.bib.gz ; \
	fi

rfc-index-fl: rfc-index.xml.gz
	gunzip -cd  rfc-index.xml.gz | xsltproc rfcxmlindex2bibtex-forcelabel.xslt - | sed -r \
	  -e 's/([_&%#$$])/\\\1/g' \
	  -e '/author=/s/([^ ]+[[:space:]]+(\(Ed.\)|3rd|Jr\.))/{\1}/g' \
	  -e "s/([^=])\"([^\"]*)\"/\1\`\`\2''/g" \
	  -e "/author=/s/([^\"]),/\1 and /g" >rfc-fl.bib
#	gunzip -cd  rfc-index.xml.gz | xsltproc rfcxmlindex2bibtex-forcelabel.xslt - | sed -e 's/\([_&%#$$]\)/\\\1/g' -e '/author=/s/\([^ ]*\) \(3rd\|Jr\.\)/\{\1 \2\}/g' -e "/title=\"{.*\".*}\"/s/{\([^\"]*\)\"\([^\"]*\)\"\([^\"]*\)}/{\1\`\`\2\'\'\3}/" -e '/author=/s/[^\"],/ and /g' >rfc-fl.bib


clean:
	rm *.aux *.bbl *.dvi *.log

.PHONY: update clean rfc-index-update rfc-index test publish
