export interface PortSettings {
  containerPort: number;
  hostPort: number;
  protocol: string;
}

export interface IMountSettings {
  containerPath: string;
  sourceVolume: string;
}

export interface IContainerSettings {
  name: string;
  image: string;
  memory: number;
  portMappings: PortSettings[];
  mountPoints: IMountSettings[];
}

export interface IVolumes {
  efsVolumeConfiguration: {
    fileSystemId: string;
    rootDirectory: string;
  };
  name: string;
}

export interface IContainerDefinition {
  containerDefinition: IContainerSettings[];
  family?: string;
  template?: string;
  volumes?: IVolumes[];
}

export interface IBaseTemplate {
  definition: IContainerDefinition;
  name: string;
}

export interface IAuth {
  result: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
    cookieStorage: {
      domain: string;
      path: string;
      expires: number;
      sameSite: string;
      secure: boolean;
    };

    authenticationFlowType: string;
  };
}

// Prisma Types
export type ICohort = {
  id: number;
  name: string;
};

export type ICourse = {
  id: number;
  name: string;
  cohortId: number;
};

export type IUser = {
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export type IUser_Cohort = {
  userId: string;
  cohortId: number;
};

export type IUser_Course = {
  userId: string;
  courseId: number;
};

export type IWorkspace = {
  uuid: string;
  desiredCount: number;
  userId: string;
  courseId: number;
  website: string;
};
