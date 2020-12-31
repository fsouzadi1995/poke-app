import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../shared/models/pokemon';
import { TooltipOptions } from 'ng2-tooltip-directive';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;

  readonly tooltipOptions: TooltipOptions = {
    'show-delay': 150,
    'hide-delay': 150,
    'tooltip-class': 'text-xs',
    placement: 'top',
  };

  constructor() {}

  ngOnInit() {}
}
