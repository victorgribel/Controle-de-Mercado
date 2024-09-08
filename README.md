# Mercado autônomo

## Endpoints da aplicação

| Método | Endpoint      | Responsabilidade                                   |
| ------ | ------------- | -------------------------------------------------- |
| POST   | /products     | Criar e adicionar o produto ao mercado             |
| GET    | /products     | Listar todos os produtos do mercado                |
| GET    | /products/:id | Listar um produto específico através do seu id     |
| PATCH  | /products/:id | Atualizar os dados de um produto através do seu id |
| DELETE | /products/:id | Deletar o produto a partir do seu id               |

#

## Middlewares da aplicação

### **Verificação de nome existente**

- Esse middleware deverá verificar se o **_name_** enviado pelo **_request.body_** já existe no banco.
- Deverá ser utilizado nas rotas:
  - POST /products
  - PATCH /products/:id
- Caso o produto **já exista**, deverá ser retornado um erro com status code **_409 CONFLICT_**.

| Resposta do servidor:                |
| ------------------------------------ |
| **Formato Json**                     |
| **Status code:** **_409 CONFLICT._** |

```json
{
  "message": "Product already registered."
}
```

### **Verificação se o id buscado existe**

- Esse middleware deverá verificar se o **_id_** enviado por **_route param_** existe de fato no banco;
- Deverá ser criado apenas um middleware e utilizado nas rotas:
  - GET /products/:id
  - PATCH /products/:id
  - DELETE /products/:id
- Caso o produto não exista deverá ser um erro com status code **_404 NOT FOUND_**.

| Resposta do servidor:                 |
| ------------------------------------- |
| **Formato Json**                      |
| **Status code:** **_404 NOT FOUND._** |

```json
{
  "message": "Product not found."
}
```

#

## Regras da aplicação

### **POST /products**

### Envio:

- Deverá ser possível criar um produto.

### Retorno:

- Um objeto contendo o produto que foi inserido.

## Exemplos de envio da requisição

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
{
  "name": "Queijo",
  "price": 10,
  "weight": 30,
  "calories": 300,
  "section": "food"
}
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Formato Json**                    |
| **Status code:** **_201 CREATED._** |

```json
{
  "id": 1,
  "name": "Queijo",
  "price": 10,
  "weight": 30,
  "calories": 300,
  "section": "food",
  "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

### **GET /products**

- Deverá ser possível listar todos os produtos do mercado.

### Retorno:

- Um objeto contendo duas chaves:
  - **total**:
    - Tipo: number.
    - Deve ser a soma do preço de todos os produtos no market.
  - **products**:
    - Tipo: array.
    - Deve conter **todos** os produtos encontrados no market.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: **/products**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
  "total": 120,
  "products": [
    {
      "id": 1,
      "name": "Queijo",
      "price": 10,
      "weight": 30,
      "calories": 300,
      "section": "food",
      "expirationDate": "2024-03-06T12:12:32.431Z"
    },
    {
      "id": 2,
      "name": "Presunto",
      "price": 100,
      "weight": 40,
      "calories": 1100,
      "section": "food",
      "expirationDate": "2024-03-06T12:12:32.431Z"
    },
    {
      "id": 3,
      "name": "Detergente",
      "price": 10,
      "weight": 1000,
      "section": "cleaning",
      "expirationDate": "2024-03-06T12:12:32.431Z"
    }
  ]
}
```

### **GET /products/:id**

- Deve ser possível buscar as informações de um produto com base em seu **_id_**.
- O **_id_** do produto deverá ser coletado através do **_route param_**.

### Exemplo de retorno:

#### Sucesso:

O exemplo abaixo foi realizado na seguinte rota: **/products/1**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
  "id": 1,
  "name": "Queijo",
  "price": 10,
  "weight": 30,
  "calories": 300,
  "section": "food",
  "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

#### Falha:

- Caso seja enviado um id inexistente no banco, não deverá ser possível listar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
  - **message**:
    - Tipo: string.
    - Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/9999` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
  "message": "Product not found."
}
```

### **PATCH /products/:id**

- Deve ser possível atualizar os dados de um produto de forma opcional.

## Exemplos de envio da requisição

#### Sucesso:

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
{
  "name": "Presunto defumado",
  "price": 100,
  "weight": 30,
  "calories": 300
}
```

| **Resposta do servidor:**      |
| ------------------------------ |
| **Formato Json**               |
| **Status code:** **_200 OK._** |

```json
{
  "id": 2,
  "name": "Presunto defumado",
  "price": 100,
  "weight": 30,
  "calories": 300,
  "section": "food",
  "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

#### Falha:

- Caso seja enviado um id inexistente no banco, não deverá ser possível atualizar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
  - **message**:
    - Tipo: string.
    - Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/9999` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
  "message": "Product not found."
}
```

### **DELETE /products/:id**

- Deve ser possível deletar um produto pelo seu **_id_**.

#### Sucesso:

- Não deve ser retornada nenhuma mensagem, apenas o status code **_204 NO CONTENT._**

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/1`.
| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|

#### Falha:

- Caso seja enviado um id inexistente no banco, não deverá ser possível deletar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
  - **message**:
    - Tipo: string.
    - Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/9999` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
  "message": "Product not found."
}
```

## Importante!

Não esqueça de adicionar **_team-m4-correcoes_** no seu repositório do github, para que seja possível realizarmos as correções.
Também não se esqueça de enviar o link do repositório na submissão da entrega.
