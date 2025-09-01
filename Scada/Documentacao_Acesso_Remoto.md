### Documentação de Acesso Remoto ao Banco de Dados SCADA-LTS e Configuração de Ambiente

---

####  **Inicialização manual do MySQL**

####  **Verificação de porta MySQL (deve estar ouvindo em 0.0.0.0:3306)**

```bash
netstat -tulnp | grep 3306
```

Saída esperada:

```
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN
```
Caso a saída seja:

```
tcp        0      0 127.0.0.1:3306            0.0.0.0:*               LISTEN
```

---
#### **Verificação de porta MySQL (deve estar ouvindo em 0.0.0.0:3306)**

*Forçar uso de 0.0.0.0 (caso ainda esteja escutando apenas em localhost)*

1. Matar o processo do MySQL em execução:

```bash
ps aux | grep mysqld
kill -9 <pid>
```

2. Iniciar novamente o MySQL manualmente com a configuração correta:

```bash
/home/isla/scadalts/mysql/server/bin/mysqld \
  --defaults-file=/home/isla/scadalts/mysql/server/my.cnf \
  --bind-address=0.0.0.0 \
  --console
```

Verifique novamente com:

```bash
netstat -tulnp | grep 3306
####  **3. Verificação da configuração do MySQL (bind-address)**

No arquivo:

```bash
/home/isla/scadalts/mysql/server/my.cnf
```

Verifique se está assim:

```ini
[mysqld]
bind-address = 0.0.0.0
```

---

####  **Criação de usuário com acesso remoto e permissão de SELECT**

Para acessar o *MySql*, utilize o comando:
```bash
mysql -u root -p --socket=/tmp/scadalts_mysqld.sock
```

```sql
CREATE USER 'remote_user'@'%' IDENTIFIED WITH caching_sha2_password BY 'senha_segura';
GRANT SELECT ON scadalts.* TO 'remote_user'@'%';
FLUSH PRIVILEGES;
```
	Utiliza-se o parametro '%' para que permita a comunicação por qualquer ip.
---

####  **Verificar usuários e hosts no MySQL**

```sql
SELECT user, host FROM mysql.user;
```

---

####  **Reiniciar Tomcat

```bash
/home/isla/scadalts/tomcat_start.sh
```

Para forçar encerramento anterior:

```bash
ps aux | grep tomcat
kill -9 <pid>
```

---

####  **Configuração no DBeaver**

- Driver: MySQL 8+
- Host: `ip_do_servidor`
- Porta: `3306`
- Banco: `scadalts`
- Usuário: `remote_user`
- Senha: `senha_segura`

Na aba **Driver Properties**, adicione:

```properties
allowPublicKeyRetrieval=true
```

---

####  **Observações Importantes**

- O plugin `sha256_password` está depreciado, `caching_sha2_password` é o recomendado (já em uso).
- O parâmetro `expire-logs-days` está depreciado. Futuramente substituí-lo por `binlog_expire_logs_seconds`.

---

Este documento pode ser usado como referência para futuras manutenções na configuração do SCADA-LTS e acesso remoto ao MySQL.

