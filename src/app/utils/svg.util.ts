import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('xiangmu', ds.bypassSecurityTrustResourceUrl('assets/images/xiangmu.svg'));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl('assets/images/month.svg'));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl('assets/images/week.svg'));
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl('assets/images/day.svg'));
  const days = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31
  ];
  days.forEach(d => ir.addSvgIcon('day'+d, ds.bypassSecurityTrustResourceUrl('assets/images/day/day'+d+'.svg')));
}