export default class Sorter {
    name='id';
    directions='desc';

    build(name, directions) {
        this.name = name;
        this.directions = directions;
        return this;
    }
}
