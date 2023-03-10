#include <stdio.h>
int main(){
	int i,sum;
	for(i=0;i<100;i=i+3){
	printf("\n%d",i);
	sum = sum + i;
	}
	printf("\ny la suma es %d",sum);
	
	return 0;
}
