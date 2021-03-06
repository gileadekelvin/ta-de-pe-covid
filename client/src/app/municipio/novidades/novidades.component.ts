import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, skip } from 'rxjs/operators';

import { UserService } from '../../shared/services/user.service';
import { Novidade } from '../../shared/models/novidade.model';
import { NovidadeService } from '../../shared/services/novidade.service';
import { indicate } from '../../shared/functions/indicate.function';

@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.scss']
})
export class NovidadesComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();

  public novidades: Novidade[];
  public novidadesTipo: Novidade[];
  public municipioEscolhido: string;
  public loading$ = new BehaviorSubject<boolean>(true);

  public filtro: any;
  public datas: any;
  public p = 1;

  constructor(
    private novidadesServices: NovidadeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.getMunicipio();
  }

  getMunicipio() {
    this.userService
      .getMunicipioEscolhido()
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribe))
      .subscribe(municipio => {
        this.municipioEscolhido = municipio;
        this.getNovidades(this.municipioEscolhido);
      });
  }

  getNovidades(municipio: string) {
    this.novidadesServices
      .getNovidadesPorMunicipio(municipio, this.datas)
      .pipe(
        skip(1),
        indicate(this.loading$),
        takeUntil(this.unsubscribe)
        )
      .subscribe(novidades => {
        this.novidades = novidades;
        this.loading$.next(false);
      });
  }

  search(filtro: any) {
    this.p = 1;
    this.novidadesServices.search(filtro);
  }

  alteraNovidades(datas: any) {
    this.datas = datas;
    this.getNovidades(this.municipioEscolhido);
  }

  naoEscolheuMunicipio(): boolean {
    return this.municipioEscolhido === '';
  }

  pageChange(p: number) {
    this.p = p;

    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams.page = p;
    this.router.navigate([], { queryParams });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
