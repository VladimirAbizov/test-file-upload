
export class CreateFileDto {
    readonly name;
    readonly client;
    readonly type;
}

export class CreateFileResponseDto {
    constructor(public id: string, public name: string) { }
}

export class DownloadFileDto {
    constructor(public buffer: string, public type: string) { }
}