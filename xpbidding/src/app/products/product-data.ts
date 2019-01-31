import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product';

export class ProductData implements InMemoryDbService {

    createDb() {
        let products: IProduct[] = [
            {
                'id': 1,
                'name': 'Leaf Rake',
                'code': 'GDN-0011',
                'releaseTimestamp': 'March 19, 2016',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'price': 19.95,
                'starRating': 3.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                'id': 2,
                'name': 'Garden Cart',
                'code': 'GDN-0023',
                'releaseTimestamp': 'March 18, 2016',
                'description': '15 gallon capacity rolling garden cart',
                'price': 32.99,
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
                'tags': ['tools', 'Garden Cart', 'home']
            },
            {
                'id': 5,
                'name': 'Hammer',
                'code': 'TBX-0048',
                'releaseTimestamp': 'May 21, 2016',
                'description': 'Curved claw steel hammer',
                'price': 8.9,
                'starRating': 4.8,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
                'tags': ['tools', 'hammer', 'construction']
            },
            {
                'id': 8,
                'name': 'Saw',
                'code': 'TBX-0022',
                'releaseTimestamp': 'May 15, 2016',
                'description': '15-inch steel blade hand saw',
                'price': 11.55,
                'starRating': 3.7,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png',
                'tags': ['tools', 'saw', 'construction']
            },
            {
                'id': 10,
                'name': 'Video Game Controller',
                'code': 'GMG-0042',
                'releaseTimestamp': 'October 15, 2015',
                'description': 'Standard two-button video game controller',
                'price': 35.95,
                'starRating': 4.6,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
                'tags': ['tools', 'Video Game Controller', 'home']
            }
        ];
        return { products };
    }
}
