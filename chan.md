##script.js
```javascript
// "algo" a l'arrache, principe de fonctionnement
Objet TabMessages()
Objet TabContacts()
//ajout d'un contact par defaut
TabContacts.push({id:'10010110101', name : 'Bender'})

//structure message type
{id:'10010110101', name : 'Bender', content :'looool'}

//reception sms
ipsRenderer('newsms', data)
    //si le numéroexiste déjà dans le tableau des Contacts
    idExist(!data.id) ? TabContacts.push({id:data.id, name : data.name})
    //charge les contacts
    listContacts()
    // si on est déjà sur le contact  
    si (isContactView(data.id))
        //on ajoute le message au tableau
        TabMessage({date: date.now(), content : data.content})
        //insere le nouveau message
        messages.add('beforeend',TabMessages.date , TabMessages.content)
    sinon
    //sinon on ajoute le messga dans le tableau des messages
        TabMessages.push({id:data.id, date: date.now(), content : data.content})
        
//liste contacts, appellé dès le lancement du prog (onload)
function listContats() {
    foreach(TabContact) 
        list-contacts.add('beforeend', Contact) //'Bender', '10010110101'
}
boolean idExist(id) {
    foreach(TabContacts) {
        return (TabContacts.id == id); break;
    }
}
boolean isContactView(phone) {
    return (chat.info.status == id)
}
String getNameById(id) {
    foreach(TabContacts) {
        TabContacts.id == id ? return TabContacts.name; break;
    }
}
//affichage discution, onclick de la fonction sur chaque div contact
showcontactchat(phone) {
    chat.info.name.value = getNameById(phone)
    chat.info.status.value = phone
    foreach(TabMessages) 
        messages.add('beforeend',TabMessages.date , TabMessages.content) // 10 janvier, 'looool' etc...
}
```
##main.js
créer on objet contact : {id: numéro, name: nom contact, content : contenu sms }
et l'envoyer via le channel 'newsms'