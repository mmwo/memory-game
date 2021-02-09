import { Board, MemoryGame } from '@app/memory/models';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiStorageService {
  private readonly GAMES = 'GAMES';
  private readonly STATS = 'STATS';

  constructor(private toastr: ToastrService) {}

  saveStats(game: MemoryGame) {
    const stats = JSON.parse(localStorage.getItem(this.STATS) || '{}');
    if (!stats[game.boardId]) {
      stats[game.boardId] = [game];
    } else {
      stats[game.boardId].push(game);
    }
    localStorage.setItem(this.STATS, JSON.stringify(stats));
  }

  fetchBoard(id: string): Board {
    const games = JSON.parse(localStorage.getItem(this.GAMES) || '{}');
    games[id] = {
      id,
      cards: [
        {
          text: 'BMW M3',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/1bmwm3.jpg?itok=0OK15iad 240w',
        },
        {
          text: 'Aston Martin\n Valkyrie',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/2astonvalk.jpg?itok=CcdOUvpH 240w',
        },
        {
          text: 'Mercedes-AMG\nOne',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/3amgone.jpg?itok=iTDvieUl 240w',
        },
        {
          text: 'Tesla\nCybertruck',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/4teslacyber.jpg?itok=AUaAkbFQ 240w',
        },
        {
          text: 'Hyundai i20N',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/5hyundaii20n.jpg?itok=ah0hWM_D 240w',
        },
        {
          text: 'Audi RS\ne-tron GT',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/6audietronrs.jpg?itok=5zIY5hKs 240w',
        },
        {
          text: 'Rimac C_Two',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/7rimac.jpg?itok=5Xe-Brnf 240w',
        },
        {
          text: 'Pininfarina\nBattista',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/8pininfarinabattista.jpg?itok=4vs7ReHQ 240w',
        },
        {
          text: 'Ford Bronco',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/9fordbronco.jpg?itok=4PE83wJG 240w',
        },
        {
          text: 'McLaren\nArtura',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/10mclarenartura.jpg?itok=2aUufpll 240w',
        },
        {
          text: 'Lotus Evija',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/11lotusevija.jpg?itok=MrWcATA8 240w',
        },
        {
          text: 'Porsche\n911 GT3',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/12gt3.png?itok=P2iersL2 240w',
        },
        {
          text: 'BMW i4',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/13bmwi4.jpg?itok=A4L93r5N 240w',
        },
        {
          text: 'Mercedes EQS',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/14mercedeseqs.jpg?itok=T3iiZaDg 240w',
        },
        {
          text: 'Lucid Air',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/15lucid.jpg?itok=eXeo9e-_ 240w',
        },
        {
          text: 'Volkswagen\nGolf Mk8 R',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/16golfr.jpg?itok=U4sHT_bR 240w',
        },
        {
          text: 'Peugeot\n508 PSE',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/17pugpse.jpg?itok=F96M62YD 240w',
        },
        {
          text: 'Porsche Taycan\nSport Turismo',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/18porschest.jpg?itok=XifsP7qU 240w',
        },
        {
          text: 'Nissan 400Z',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/19nissanzed.jpg?itok=t9jl8ZFp 240w',
        },
        {
          text: 'Subaru BRZ',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/20brz.jpg?itok=6ujwhzkV 240w',
        },
        {
          text: 'Rivian R1T',
          img:
            'https://www.topgear.com/sites/default/files/styles/fit_980x551/public/images/news-listicle/items2/2020/12/0b516832d6fd9d06b8a784f8b30791e4/21rivian.jpg?itok=RLuIg6a9 980w',
        },
      ],
    };
    if (!games[id]) {
      this.toastr.error(`Selected game doesn't exist`);
      return;
    }
    return games[id];
  }
}
