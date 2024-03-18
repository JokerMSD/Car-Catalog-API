# M5 - Entrega 3 - Catalago de Carros API

Está documentação servirá de base para entrega, todas as rotas deverão se comportar assim como está previsto na documentação abaixo:

### Criação de carros POST /cars

Padrão de corpo

```json
{
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}  
```

#### Possíveis erros:
STATUS (400) quando o corpo não é compatível com o padrão

Utilize o Zod para fazer a validação correta do corpo de requisição.

### Leitura de carros GET /cars

Padrão de resposta  (STATUS: 200)

```json
[
   {
      "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
      "name": "Car name",
      "description": "Car description",
      "brand": "Card brand",
      "year": 2023,
      "km": 10000
   }
] 
```

### Leitura de individual GET /cars/:id

Padrão de resposta  (STATUS: 200)

```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}  
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Car not found."
}
```

### Atualizar carros PATCH  /cars/:id

Padrão de corpo 

```json
{
    "name": "Car name updated",
    "description": "Car description updated",
    "brand": "Card brand updated",
    "year": 2022,
    "km": 20000
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name updated",
    "description": "Car description updated",
    "brand": "Card brand updated",
    "year": 2022,
    "km": 20000
}    
```

#### Possíveis erros:
STATUS (400) quando o corpo não é compatível com o padrão

Utilize o Zod para fazer a validação correta do corpo de requisição.

Status (404) - Carro não encontrado

```json
{
    "message": "Car not found."
}
```

### Excluir tarefa DELETE /cars/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Carro inválida

```json
{
    "message": "Car not found."
}
```
