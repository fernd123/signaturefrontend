export class Meeting{
   constructor(name, reason, signature) {
       this.name = name;
       this.reason = reason;
       this.signature = signature;
       this.initDate = new Date();
       this.endDate = null;
   }
}