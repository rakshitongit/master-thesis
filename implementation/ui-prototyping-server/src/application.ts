import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
    RestExplorerBindings,
    RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTAuthenticationComponent, UserServiceBindings } from '@loopback/authentication-jwt';
import { MongoDataSource } from './datasources';
import { FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY } from './keys';
import multer from 'multer';

export { ApplicationConfig };

export class UiPrototypingServerApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication)),
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        // json files
        this.static('/json', path.join(__dirname, '../public/json'));

        this.static('/download', path.join(__dirname, '../public/files'));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });

        this.component(RestExplorerComponent);

        // Configure file upload with multer options
        this.configureFileUpload(options.fileStorageDirectory);

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };

        this.component(AuthenticationComponent);
        // Mount jwt component
        this.component(JWTAuthenticationComponent);
        // Bind datasource
        this.dataSource(MongoDataSource, UserServiceBindings.DATASOURCE_NAME);

    }

    /**
     * Configure `multer` options for file upload
     */
    protected configureFileUpload(destination?: string) {
        // Upload files to `dist/.sandbox` by default
        destination = destination ?? path.join(__dirname, '../.sandbox');
        this.bind(STORAGE_DIRECTORY).to(destination);
        const multerOptions: multer.Options = {
            storage: multer.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        };
        // Configure the file upload service with multer options
        this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
