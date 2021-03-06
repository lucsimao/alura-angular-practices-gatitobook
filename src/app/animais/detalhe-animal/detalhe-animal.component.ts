import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AnimaisService } from './../animais.service';
import { Animal } from '../animais';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params['animalId'];
    this.animal$ = this.animaisService.buscaPorId(this.animalId);
  }

  curtir() {
    this.animaisService.curtir(this.animalId).subscribe({
      next: (curtida) => {
        if (curtida) {
          this.animal$ = this.animaisService.buscaPorId(this.animalId);
        }
      },
    });
  }

  excluir() {
    this.animaisService.excluiAnimal(this.animalId).subscribe({
      next: () => {
        this.router.navigate(['/animais']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
