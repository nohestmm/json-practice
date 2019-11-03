 //NO PUBLIQUE ESTE PROYECTO EN GITHUB, GITLAB o algun repositorio de ningun Tipo

 const clients = [{
         id: 1,
         taxNumber: '86620855',
         name: 'HECTOR ACUÑA BOLAÑOS'
     },
     {
         id: 2,
         taxNumber: '7317855K',
         name: 'JESUS RODRIGUEZ ALVAREZ'
     },
     {
         id: 3,
         taxNumber: '73826497',
         name: 'ANDRES NADAL MOLINA'
     },
     {
         id: 4,
         taxNumber: '88587715',
         name: 'SALVADOR ARNEDO MANRIQUEZ'
     },
     {
         id: 5,
         taxNumber: '94020190',
         name: 'VICTOR MANUEL ROJAS LUCAS'
     },
     {
         id: 6,
         taxNumber: '99804238',
         name: 'MOHAMED FERRE SAMPER'
     }
 ];
 const accounts = [{
         clientId: 6,
         bankId: 1,
         balance: 15000
     },
     {
         clientId: 1,
         bankId: 3,
         balance: 18000
     },
     {
         clientId: 5,
         bankId: 3,
         balance: 135000
     },
     {
         clientId: 2,
         bankId: 2,
         balance: 5600
     },
     {
         clientId: 3,
         bankId: 1,
         balance: 23000
     },
     {
         clientId: 5,
         bankId: 2,
         balance: 15000
     },
     {
         clientId: 3,
         bankId: 3,
         balance: 45900
     },
     {
         clientId: 2,
         bankId: 3,
         balance: 19000
     },
     {
         clientId: 4,
         bankId: 3,
         balance: 51000
     },
     {
         clientId: 5,
         bankId: 1,
         balance: 89000
     },
     {
         clientId: 1,
         bankId: 2,
         balance: 1600
     },
     {
         clientId: 5,
         bankId: 3,
         balance: 37500
     },
     {
         clientId: 6,
         bankId: 1,
         balance: 19200
     },
     {
         clientId: 2,
         bankId: 3,
         balance: 10000
     },
     {
         clientId: 3,
         bankId: 2,
         balance: 5400
     },
     {
         clientId: 3,
         bankId: 1,
         balance: 9000
     },
     {
         clientId: 4,
         bankId: 3,
         balance: 13500
     },
     {
         clientId: 2,
         bankId: 1,
         balance: 38200
     },
     {
         clientId: 5,
         bankId: 2,
         balance: 17000
     },
     {
         clientId: 1,
         bankId: 3,
         balance: 1000
     },
     {
         clientId: 5,
         bankId: 2,
         balance: 600
     },
     {
         clientId: 6,
         bankId: 1,
         balance: 16200
     },
     {
         clientId: 2,
         bankId: 2,
         balance: 10000
     }
 ]
 const banks = [{
         id: 1,
         name: 'SANTANDER'
     },
     {
         id: 2,
         name: 'CHILE'
     },
     {
         id: 3,
         name: 'ESTADO'
     }
 ];


 // 0 Arreglo con los ids de clientes
 const listClientsIds = () => {
     return clients.map((client) => client.id);
 };

 // 1 Arreglo con los ids de clientes ordenados por rut
 const listClientsIdsSortByTaxNumber = () => {
     return clients.sort((clientOne, clientTwo) => clientOne.taxNumber > clientTwo.taxNumber)
         .map((client => client.id))
 };

 // 2 Arreglo con los nombres de clientes ordenados de mayor 
 //a menor por la suma TOTAL de los saldos de cada cliente 
 //en los bancos que participa.
 const sortClientsTotalBalances = () => {
     let totalBalanceClients = accounts.reduce((clientsWithBalance, client) => {
         let id = client.clientId;
         let total = client.balance;
         clientsWithBalance[id] = (clientsWithBalance[id] || 0) + total
         return clientsWithBalance;
     }, {})
     let clientsWithTotalBalance = clients.map(client => {
             let totalBalance = totalBalanceClients[client.id]
             return Object.assign(client, {
                 totalBalance: totalBalance
             })
         })
         .sort((clientOne, clientTwo) => clientTwo.totalBalance - clientOne.totalBalance)
         .map(client => client.name)
     return clientsWithTotalBalance;
 }

 // 3 Objeto en que las claves sean los nombres de los bancos 
 //y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
 const banksClientsTaxNumbers = () => {
     let arrayBanksClientsTaxNumbers = accounts.reduce((clientsNumbers, el) => {
         let id = el.bankId;
         let clientsTaxNumbers = accounts.filter(client => client.bankId === id)
             .map(client => client.clientId)
         clientsNumbers[id] = [...new Set(clientsTaxNumbers)];

         return clientsNumbers
     }, {})
     let objectBanksClientsTaxNumbers = banks.map(client => {
         let value = arrayBanksClientsTaxNumbers[client.id]
         return Object.assign({
             id: client.name,
             value: value
         })
     })

     const clientsArrayOrderByName = clients.sort((clientOne, clientTwo) =>
         clientOne.name.localeCompare(clientTwo.name))

     console.log(clientsArrayOrderByName)
  

    objectBanksClientsTaxNumbers.forEach((el,index )=>{
       const values = el.value;
          values.forEach((val,pos)=>{
      clientsArrayOrderByName.forEach((client,position) =>{
               if(values.includes(client.id))
        values[pos] = clientsArrayOrderByName[pos].taxNumber
            })
      })
         })

     return JSON.stringify(objectBanksClientsTaxNumbers)

 }

 // 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
 const richClientsBalances = () => {
     return accounts.filter(client => client.balance > 25000 && client.bankId === 1)
         .sort((clientOne, clientTwo) => clientTwo.balance - clientOne.balance)
         .map(client => client.balance)

 }

 // 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
 const banksRankingByTotalBalance = () => {
     let totalBanks = accounts.reduce((banksBalance, bank) => {
         let id = bank.bankId;
         let total = bank.balance;
         banksBalance[id] = (banksBalance[id] || 0) + total
         return banksBalance;
     }, {})
     let banksWithTotalBalance = banks.map(bank => {
             let totalBalance = totalBanks[bank.id]
             return Object.assign(bank, {
                 totalBalance: totalBalance
             })
         })
         .sort((bankOne, bankTwo) => bankOne.totalBalance - bankTwo.totalBalance)
         .map(bank => bank.id)

     return banksWithTotalBalance;
 }
 // 6 Objeto en que las claves sean los nombres de los bancos y 
 //los valores el número de clientes que solo tengan cuentas en ese banco.
 const banksFidelity = () => {
     let newObjectWithBanksAndFidelityClients = accounts.reduce((banksAndFidelityClients, key) => {
         let id = key.bankId;

         banksAndFidelityClients[id] = (banksAndFidelityClients[id] || 0) + 1;
         return banksAndFidelityClients;
     }, {})
     let objectWithBanksAndTotalClients = banks.map(element => {
         let value = newObjectWithBanksAndFidelityClients[element.id]
         return Object.assign({
             id: element.name,
             value: value
         })

     }, {})
     return JSON.stringify(objectWithBanksAndTotalClients);
 }

 // 7 Objeto en que las claves sean los nombres de los bancos 
 //y los valores el id de su cliente con menos dinero.
 const banksPoorClients = () => {
     let arrayBanksClientsTaxNumbers = accounts.reduce((clientsNumbers, el) => {
         let id = el.bankId;
         let clientsTaxNumbers = accounts.filter(client => client.bankId === id)


         clientsNumbers[id] = clientsTaxNumbers.reduce((banksBalance, bank) => {
             let id = bank.clientId;
             let total = bank.balance;
             banksBalance[id] = (banksBalance[id] || 0) + total
             return banksBalance;
         }, {})

         return clientsNumbers
     }, {})
     let banksWithTotalBalance = banks.map(bank => {
         let value = arrayBanksClientsTaxNumbers[bank.id]
         return Object.assign({
             id: bank.name,
             value: value
         })
     })
let arrayWithOnlyLessMoney = []
     const clientWithLessMoney = banksWithTotalBalance.map(el=>el.value)
    .map(el=>{
        return (Object.values(el)
        .sort((a,b) => a-b)).map((el,index)=> 
        index === 0 ? arrayWithOnlyLessMoney.push(el): null)
     })
     console.log(clientWithLessMoney);
//      const arrayWithOnlyLessMoney = []

     console.log(arrayWithOnlyLessMoney)
     return JSON.stringify(banksWithTotalBalance)
 }

 // 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
 // Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
 // No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
 const newClientRanking = () => {
     const otherClients = clients
     const otherAccounts = accounts
     otherClients.push({
         id: 7,
         taxNumber: '99988877',
         name: 'ARTURO USLAR PIETRI'
     })
     otherAccounts.push({
         clientId: 7,
         bankId: 3,
         balance: 9000
     })
     return sortClientsTotalBalances();
 }


 //Impresión de soluciones. No modificar.
 //  console.log('Pregunta 0');
 //  console.log(listClientsIds());
 //  console.log('Pregunta 1');
 // //  console.log(listClientsIdsSortByTaxNumber());
 // console.log('Pregunta 2');
 // console.log(sortClientsTotalBalances());
//  console.log('Pregunta 3');
//  console.log(banksClientsTaxNumbers());
 // console.log('Pregunta 4');
 // console.log(richClientsBalances());
 // console.log('Pregunta 5');
 // console.log(banksRankingByTotalBalance());
 console.log('Pregunta 6');
 console.log(banksFidelity());
 console.log('Pregunta 7');
 console.log(banksPoorClients());
 //  console.log('Pregunta 8');
 //  console.log(newClientRanking());