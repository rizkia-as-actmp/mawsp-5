# REST
REST, (REpresentational State Transfer), adalah *architectural style* *untuk distributed hypermedia systems*. Diperkenalkan pertama kali oleh Roy Fielding pada tahun 2000 dalam disertasinya, REST telah menjadi salah satu *architectural style* paling umum dalam *development* API berbasis web.

REST bukanlah protokol atau standar, melainkan *architectural style*. Selama *development*, developer API dapat menerapkan REST dengan berbagai cara.

Seperti *architectural style* lainnya, REST memiliki prinsip dan *constraints*. Prinsip-prinsip ini harus dipenuhi agar *service interface* dapat disebut RESTful.

### I. Enam Prinsip Panduan REST
------------
REST didasarkan pada sejumlah *constraints*. dan prinsip yang mendukung kesederhanaan, skalabilitas, dan statelessness dalam desainnya. Enam prinsip atau *constraints*. utama dalam arsitektur RESTful adalah:

##### 1. Uniform Interface
*Uniform interface* memungkinkan *interface* yang konsisten untuk interaksi antara klien dan server. Prinsip ini mencakup empat *constraints*:
-  **Identification of resources** – Setiap *resources* harus memiliki identitas unik dalam interaksi klien dan server.
- **Manipulation of resources through representations** – Representasi *resources* yang konsisten digunakan dalam respons server, memungkinkan klien mengubah status *resources*.
- **Self-descriptive messages** – Setiap representasi *resources* membawa informasi yang cukup untuk menjelaskan cara memproses pesan tersebut dan tindakan tambahan yang dapat dilakukan.
- **Hypermedia as the engine of application state** – Klien hanya memiliki URI awal aplikasi, dan seluruh interaksi didorong melalui *hyperlink*.

Dalam praktiknya, API REST berbasis HTTP menggunakan metode standar (GET, POST, PUT, DELETE, dll.) dan URI (Uniform Resource Identifier) untuk identifikasi *resources*.

##### 2. Client-Server
Desain client-server memisahkan *interface* pengguna (klien) dari *data storage* (server), yang meningkatkan portabilitas *interface* pengguna di berbagai platform serta skalabilitas server. Dengan demikian, klien dan server dapat berevolusi secara independen tanpa mengganggu kontrak *interface*.

##### 3.  Stateless
Prinsip statelessness mengharuskan setiap permintaan dari klien ke server mengandung semua informasi yang diperlukan. Server tidak menyimpan Context *session*, sehingga aplikasi klien harus menyimpan seluruh status *session*.

##### 4. Cacheable
Prinsip ini menyatakan bahwa respons harus secara eksplisit atau implisit menunjukkan apakah dapat di-cache. Jika respons dapat di-cache, klien dapat menggunakannya kembali untuk permintaan serupa dalam periode tertentu.

##### 5. Layered System
Sistem berlapis memungkinkan arsitektur disusun dalam lapisan hierarkis, di mana setiap komponen hanya berinteraksi dengan lapisan yang terdekat. Contohnya, pola MVC (Model-View-Controller) memisahkan berbagai *concerns*, membuat aplikasi lebih mudah dikembangkan, dikelola, dan diskalakan.

##### 6. Code on Demand (Optional)
REST memungkinkan fungsionalitas klien diperluas melalui *downloading and executing code* dalam bentuk seperti applet atau skrip. Hal ini menyederhanakan klien dengan mengurangi fitur yang perlu diimplementasikan sebelumnya, di mana server dapat menyediakan sebagian fitur yang akan dijalankan oleh klien.

### II. Apa Itu Sumber Daya?
------------
*The key abstraction of information in REST is a resource*. Setiap informasi yang dapat diberi nama bisa dianggap sebagai *resources*. Contohnya, *resources* REST bisa berupa dokumen, gambar, *a temporal service*, kumpulan *resources* lainnya, atau objek non-virtual (misalnya, *a person*).

Status dari *resources* pada waktu tertentu dikenal sebagai ***resource representation*** . *Resource representation* terdiri dari:

- **data**
- **metadata** yang menjelaskan tentang data itu sendiri
- **hypermedia links** that can help the clients transition to the next desired state.

> A REST API consists of an assembly of interlinked resources. This set of resources is known as the REST API’s resource model.

##### 1. Identifikasi *resources*
REST menggunakan *resource identifiers* untuk mengenali setiap *resources* yang terlibat dalam interaksi antara komponen klien dan server.

##### 2. Hypermedia
Format data dari representasi disebut sebagai **media type**. Media type mengidentifikasi spesifikasi yang mendefinisikan bagaimana representasi tersebut harus diproses.

API RESTful berfungsi seperti *hypertext*. Setiap unit informasi yang dapat diakses memiliki alamat, baik secara eksplisit (misalnya, atribut tautan dan ID) atau secara implisit (e.g., derived from the media type definition and representation structure).	.

> Hypertext (or hypermedia) means the simultaneous presentation of information and controls such that the information becomes the affordance through which the user (or automaton) obtains choices and selects actions.
> 
Remember that hypertext does not need to be HTML (or XML or JSON) on a browser. Machines can follow links when they understand the data format and relationship types.
> 
— Roy Fielding

##### 3. Self-Descriptive
Representasi *resources* juga harus **self-descriptive**: klien tidak perlu mengetahui apakah *resources* tersebut adalah *employee or a device*. Klien harus bertindak berdasarkan media type associated with the *resources*.

Dalam praktiknya, kita akan membuat banyak custom media types – biasanya satu media type terkait dengan satu *resources*. 

Setiap media type mendefinisikan sebuah *default processing model*. Sebagai contoh, HTML mendefinisikan proses rendering untuk hypertext dan *browser behavior around each element.*

##### 4. Example
Consider the following REST resource that represents a blog post with links to related resources in an HTTP-based REST API. This has the necessary information about the blog post, as well as the hypermedia links to the related resources such as author and comments. Clients can follow these links to discover additional information or perform actions.

<br>![gambar tugas widget](/mawsp-5/md/example.png)<br>






