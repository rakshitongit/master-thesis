eval '(exit $?0)' && eval 'exec perl -S $0 ${1+"$@"}' && eval 'exec perl -S $0 $argv:q' # -*-perl-*-
        if 0;

# bibtex is limited to cite 5000 references only
# so we must break up things a little bit
$maxcitekeys=5000;
$filecount=1;
$currentcitekey=0;
$outfname="testrfcbib-$filecount.tex";

$begintxt="\\documentclass\{book\}
\\begin\{document\}\n";

$endtxt="\\bibliographystyle\{unsrt\}
\\bibliography\{rfc\}
\\end\{document\}\n
";


open($outfhandle,">$outfname");
printf $outfhandle $begintxt;
while(<>)
{
    if ( /^\@misc\{(.*),$/ ) 
    {
	$rfcname=$1;
	printf $outfhandle "\\cite\{".$rfcname."\}\n";
	$currentcitekey++;
	if ($currentcitekey % $maxcitekeys == 0)
	{
	    printf $outfhandle $endtxt;
	    close($outfhandle);
	    $filecount++;
	    $outfname="testrfcbib-$filecount.tex";
	    open($outfhandle,">$outfname");
            printf $outfhandle $begintxt;
	}
    }
}
printf $outfhandle $endtxt;
close($outfhandle);
    
