#!/usr/bin/perl

###### 遍历哈希 #######
my %hash;
 
%hash = ("小明"=>{'语文'=>50, '数学'=>60},
        "小刚"=>{'语文'=>80, '数学'=>90});
# if ($hash{'小明'}) {
#     print 'a';
# }else{
#     print 'b';
# }
foreach my $key ( keys %hash )
{
    print "$key:\n";
    my $subhash = $hash{$key};
    foreach my $subkey ( keys %$subhash )
    {
        print "\t$subkey => $$subhash{$subkey}\n";
    }
}

###### 删除数组中指定元素 #######
my @arr =(sf,fsdf,wer,f,asdf,f);

@arr = grep(/[^wer]/,@arr); 
print @arr;


###### 读取文件中内容 #######
my $file_user = user;
my @lines;
open( FILE, "<$file_user");
foreach my $record ( <FILE> ) {
    $record=~s/\r\n//g;

    push (@lines,$record);
}

my @lines_ref;
foreach $item (@lines){
	$item = $item.",";
	my @temp = split(/,/, $item);

	if ($temp[7] eq "192.168.150.177") {
		$temp[4] = $temp[5];
		$temp[2] = $temp[7];
	}

	@temp = join(",",$temp[0],$temp[1],$temp[2],$temp[3],$temp[4],$temp[5],$temp[6],$temp[7]);
	push (@lines_ref,@temp);
}

print @lines;
print @lines_ref;


###### PERL获取时间 #######
my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);

my @tt = ($sec,$min,$hour,$mday,($mon+1),($year+1900));
foreach $item (@tt){
	if ($item < 10) {
		$item = '0'.$item;
	}
}

my $time = $sec."-".$min."-".$hour."-".$mday."-".$mon."-".$year."-".$wday."-".$yday."-".$isdst;
my $localtime = ($year+1900)."-".($mon+1)."-".$mday." ".$hour.":".$min.":".$sec;
my $ttt = $tt[5]."-".$tt[4]."-".$tt[3]." ".$tt[2].":".$tt[1].":".$tt[0];
print $ttt."\n";
print $time."\n";
print $localtime."\n";


###### 操作数组 ######

print "123\n";
@array = 0..10;
print "@array\n";

# 遍历数组
foreach $x(@array){
    print "$x ";
}
print "\n";

print "====================\n";

foreach $x(qw(aa cc dd ww h ee)){
    print "$x ";
}

print "\n";
print "====================\n";

#默认变量 $_
foreach (5..10){
    print "$_ ";
}
print "\n";

#reverse
@array = reverse @array;
print "@array \n";

#sort
print "====================\n";
@tt = qw(16 12 421 62 13 7 1 8);
print "@tt\n";
@tt = sort @tt;
print "@tt\n";

#each 拿到index
while(($index,$value) = each @tt){
    print "$index,$value\n";
}
# 截取数组
my @arr = ('1','2','3','4','5');
my @new_arr = splice @arr , 1 , 1;

print @arr;
print "\n";
print @new_arr;
print "\n";
