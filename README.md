# NestJS Backend

## 개발환경 구성

백엔드 구성은 redis, kafka, mongodb 등 서비스 전반에 걸쳐 사용 되는 `인프라` 시스템들과 실제 서비스하는 `앱`으로 구성된다. 인프라와 앱 모두 **`k8s`**에 설치하며, 디버깅시 호스트에서 클러스터 내부로의 접근이 필요하기 때문에 이를 설정하는 방법도 설명한다.

### 프로젝트 구조

MSA를 구성하는 monorepo 구조

```bash
├── dist
├── apps
│   ├── api-gateway
│   │   ├── config
│   │   ├── src
│   │   │   ├── auth
│   │   │   │   └── jwt
│   │   │   └── health
│   │   ├── test
│   │   └── Dockerfile
│   └── auth
│       ├── config
│       ├── src
│       │   ├── oauth
│       │   │   └── usecase
│       │   └── user
│       ├── test
│       └── Dockerfile
├── k8s-configs
│   ├── helm
│   │   ├── api-gateway
│   │   │   ├── charts
│   │   │   └── templates
│   │   │       └── tests
│   │   ├── auth
│   │   │   ├── charts
│   │   │   └── templates
│   │   │       └── tests
│   │   ├── elasticsearch
│   │   ├── kibana
│   │   ├── mongodb
│   │   ├── rabbitmq
│   │   └── redis
│   └── istio
├── libs
│   └── core
│       ├── config
│       │   ├── config.debug.yaml
│       │   ├── config.local.yaml
│       │   └── config.yaml
│       └── src
│           ├── cache
│           ├── config
│           ├── database
│           ├── decorator
│           ├── health
│           ├── http
│           ├── jwt
│           ├── logger
│           ├── middleware
│           └── notification
├── proto
│   ├── auth.proto
│   └── health.proto
├── reports
│   ├── 20230823-report.html
│   └── 20230823-report.html
├── nest-cli.json
├── node_modules
├── package.json
├── stress-test.yaml
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### 환경 구성

| NODE_ENV | 실행환경       | 설명                                                                 |
| -------- | -------------- | -------------------------------------------------------------------- |
| debug    | host, minikube | 앱은 host에서 실행되고, 인프라는 minikube에서 실행되는 설정으로 구성 |
| local    | minikube       | 앱과 인프라 모두 minikube에서 실행되는 설정으로 구성                 |
| dev      | EKS            | 앱과 인프라 모두 EKS에서 실행되는 설정으로 구성                      |
| prod     | EKS            | 앱과 인프라 모두 EKS에서 실행되는 설정으로 구성                      |

### Minikube 설치

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

### Minikube 시작

private registry를 http로 접근하기 위한 설정을 추가 했다 `--insecure-registry`

한 번 설정 되면 이후로는 `minikube start` 만 사용해도 된다

```bash
minikube start --insecure-registry=192.168.0.67:5000
```

### Helm 설치

```bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

### Helm Repo 추가

[bitnami](https://github.com/bitnami/charts/tree/main/bitnami)에서 인프라 구성에 필요한 대부분의 차트를 제공한다.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

### 클러스터 외부에서 pod에 접근할 수 있게 설정

여러가지 방법이 있으나 `minikube tunnel` 을 실행하고, LoadBalancer 서비스를 사용하는 방법으로 선택했다. tunnel을 실행하면 LoadBalancer 타입 서비스의 EXTERNAL-IP가 `127.0.0.1` 로 할당되고 호스트의 포트를 통해 pod로 접속할 수 있게 된다.

```bash
minikube tunnel
```

```bash
nohup minikube tunnel > /dev/null 2>&1 &
```

```bash
~ kubectl get svc
NAME             TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)
api-gateway      LoadBalancer   10.103.172.202   127.0.0.1     8080:32497/TCP
```

localhost:8080으로 접속하면 api-gateway 서비스를 통해 api-gateway pod 중 한 곳으로 접속하게 된다.
