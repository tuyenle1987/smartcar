import { RemoteService } from './remote.service';
import { RemoteRequest, RemoteResponse } from '../interfaces/remote.interface';
export declare class RemoteController {
    private readonly remoteService;
    constructor(remoteService: RemoteService);
    engineHandler(id: string, body: RemoteRequest): Promise<RemoteResponse>;
}
