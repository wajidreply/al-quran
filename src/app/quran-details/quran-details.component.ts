import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';

interface Page {
  page: number;
  content: string;
  image: string;
  manzil: number;
}

interface Surah {
  surahId: number;
  surahName: string;
  pages: Page[];
}

interface ParaDetails {
  paraId: string;
  paraName: string;
  surahs: Surah[];
}

interface Para {
  paraId: string;
  paraPath: string;
}

interface QuranData {
  quran: {
    para: Para[];
  };
}

@Component({
  selector: 'app-quran-details',
  templateUrl: './quran-details.component.html',
  styleUrls: ['./quran-details.component.scss']
})
export class QuranDetailsComponent implements OnInit {

  quranData: any;
  selectedPara: any;
  selectedSurah: any;
  pages: any[] = [];
  pageContent: { [key: number]: string } = {};
  currentPageIndex: number = 0;

  topText: string = '';
  sideText: string = '';
  bottomText: string = '';
  imageUrl: string = ''; // Adjust the path accordingly

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get('assets/quran/quran-data.json').subscribe(data => {
      this.quranData = data;
    });
  }

  onParaChange(event: MatSelectChange): void {
    const paraPath = event.value;
    this.http.get(paraPath).subscribe((paraData: any) => {
      this.selectedPara = paraData;
      this.selectedSurah = null;  // Reset Surah
      this.pages = [];
    });
  }

  onSurahChange(event: MatSelectChange): void {
    this.selectedSurah = event.value;
    this.pages = this.selectedSurah.pages;
    this.loadPageContent();
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }

  loadPageContent(): void {
    this.pages.forEach(page => {
      this.http.get(page.content, { responseType: 'text' }).subscribe(content => {
        this.pageContent[page.page] = content;
        this.cdr.detectChanges();
      });
    });
  }

  setContent(pageContent: any) {
    this.topText = '';
    this.sideText = '';
    this.bottomText = '';
    const splitIndex1 = Math.floor(pageContent?.length / 3);
    const splitIndex2 = Math.floor(2 * pageContent?.length / 3);

    this.topText = pageContent?.slice(0, splitIndex1);
    this.sideText = pageContent?.slice(splitIndex1, splitIndex2);
    this.bottomText = pageContent?.slice(splitIndex2);
  }

}
