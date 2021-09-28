import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePost1632832025368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Deadline at Dawn', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Manhattan Baby', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Quills', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Sergeant Rutledge', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('My Summer of Love', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Headfirst', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Used Cars', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Cougars, Inc.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Other F Word, The', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('10.5', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Morgan Stewart''s Coming Home', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Tess of the Storm Country', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('First Grader, The', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Don''t Look in the Basement!', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Out of the Blue', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Siam Sunset', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Mike Bassett: England Manager', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Hell Night', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Good Hair', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Wild Reeds (Les roseaux sauvages)', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Taxi zum Klo', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Too Much Sleep', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Windstruck (Nae yeojachingureul sogae habnida)', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Silencers, The', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Deserter (Dezertir)', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Orgy of the Dead', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Baghban', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Mississippi Masala', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Tukkijoella', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Texasville', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Polskie gówno', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Silent House', 'Fusce consequat. Nulla nisl. Nunc nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('The Land Before Time VIII: The Big Freeze', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('På sista versen', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Once in a Lifetime', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Macario', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Natural Born Killers', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Confessions of a Nazi Spy', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Father of My Children, The (Le père de mes enfants)', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Boondock Saints II: All Saints Day, The', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Tokio Baby', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Dr. Jekyll and Ms. Hyde', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Justin Bieber: Never Say Never', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Twelve O''Clock High', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Field, The', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Breathless', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Chiedimi se sono felice', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Flowers of War, The (Jin líng shí san chai)', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Oklahoma Crude', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('My Favorite Martian', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Certain Kind Of Death, A', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Diary of Anne Frank, The', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Three Stooges Meet Hercules, The', 'Fusce consequat. Nulla nisl. Nunc nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('They Only Kill Their Masters', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Air Crew', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Sometimes They Come Back... Again', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Sheena', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Descent: Part 2, The', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Kidnapping, Caucasian Style (Kavkazskaya plennitsa)', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Last Ride, The', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Where the Trail Ends', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Hercules and the Amazon Women', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Hôtel du Nord', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Sudden Death', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Ginger Snaps', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Toolbox Murders, The', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Pirates of Silicon Valley', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Quest for a Heart (Röllin sydän)', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Raggedy Man', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('War of the Worlds', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Burning Bright', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Jar City (Mýrin)', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('The Detective 2', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Zatoichi Challenged (Zatôichi chikemuri kaidô) (Zatôichi 17)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Dogville', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Toy Story 2', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Payday', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Birdsong (Cant dels ocells, El)', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Don''t Go In the Woods', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('EXPO: Magic of the White City', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Boy Friend, The', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Flags of Our Fathers', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Million Dollar Legs', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Planet of the Vampires (Terrore nello spazio)', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Saving Mr. Banks', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Young Again', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('First Love', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Samsara', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Pinocchio', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Box, The', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Statue of Liberty, The', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('October Baby', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Scorcher', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Mr. Jealousy', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Mermaid, The (Rusalka)', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Goodbye Bafana (Color of Freedom, The)', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Thunderpants', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Retroactive', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Peacock', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
insert into post (title, text, "thumbnailUrl", "videoUrl", "creatorId") values ('Mar Baum', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid+square.png', 'https://cookknow.s3.ap-southeast-1.amazonaws.com/squid_2.mp4', 'd7b819cb-6a7e-4e60-93d6-d20297157920');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
