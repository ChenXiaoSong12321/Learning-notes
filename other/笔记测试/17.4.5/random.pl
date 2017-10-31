#!/usr/bin/perl
my @W = ('0' .. '9', 'a' .. 'z', 'A' .. 'Z');
print randstr(6);
sub randstr {
    my $len = shift;
    my $str;
    my $i = 0;
    while ($i++ < $len) {
        $str .= $W[rand(@W)];
    }
    return $str;
}