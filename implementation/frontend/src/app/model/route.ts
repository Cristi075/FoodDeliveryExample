import { RouteStep } from './route-step';

export class Route {
    distance: number;
    duration: number;
    startAddress: string;
    endAddress: string;
    polyline: string;
    steps: RouteStep[];
}
