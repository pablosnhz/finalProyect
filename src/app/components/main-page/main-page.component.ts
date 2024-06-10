import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LevelService } from 'src/app/core/services/common/level-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  completedLevels: Set<number> = new Set<number>();

  constructor(
    public auth: AuthService,
    private router: Router,
    private levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.levelService.loadCompletedLevels();
    this.completedLevels = this.levelService.getCompletedLevels();

    this.levelService.levelCompleted$.subscribe((completedLevels) => {
      this.completedLevels = completedLevels;
    });
  }

  logout() {
    this.auth.logout();
  }

  onSelectLevel(levelIndex: number) {
    this.router.navigate([], {
      queryParams: { level: levelIndex },
      queryParamsHandling: 'merge',
    });
  }

  isLevelCompleted(levelIndex: number): boolean {
    return this.completedLevels.has(levelIndex);
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }
}
