import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const QUERY = gql`
  {
    getCategoryList {
      items {
        _id
        name
        products {
          _id
          description
          image
          name
          price
          slug
        }
        slug
      }
      total
    }
  }
`;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: QUERY,
      })
      .valueChanges.subscribe(result => console.log(result));
  }
}
