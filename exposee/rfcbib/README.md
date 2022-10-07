# A bibtex file for the RFC collection (Internet standard documents and other documents published by the IETF, IRTF and individuals)

If you're frequently citing RFCs as reference, you might want to have
a bibtex file of all RFCs. So I wrote an XSLT script to translate the
XML-based rfc index, which is provided by the RFC editor, into a
bibtex format. Because it is my first XSLT file I've written, it may
be far from being perfect. However, I think it works well enough for
most purposes. After translation by xslt, you need to replace some
special characters that TeX doesn't like. This is preferably done by
sed or perl, because XSLT does not perform very well for such
tasks. Okay, I hope I saved a little bit of your valuable time, so
enjoy...

The rfc.bib file is automatically checked for correct syntax before it
gets published. However, when including rfc.bib, please check to
remove any \cite{*} in your TeX files, because there is an intentional
hard limit of having 5000 citations at most and running TeX will
fail with a corresponding error message.

I'm open for improvements and bug reports, however, I can't
promise to react in a timely manner.
