import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { TooltipOptions } from 'ng2-tooltip-directive';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent {
  @Input() public readonly pokemon!: Pokemon;

  public readonly tooltipOptions: TooltipOptions = {
    'show-delay': 150,
    'hide-delay': 150,
    'tooltip-class': 'text-xs',
    placement: 'top',
  };
}
