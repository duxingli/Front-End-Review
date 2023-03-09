/**
 *
 * Promise.then --> await
 *
 * createData(title, successBack, errorBack) {
 *     // 使用key保存数据
 *     storage.save({
 *         key: title,
 *         data: 'true',
 *     }).then(successBack(), errorBack());
 * }
 *
 * async createData1(title, successBack, errorBack) {
 *     try {
 *         // 使用key保存数据
 *         await storage.save({
 *             key: title,
 *             data: 'true',
 *         });
 *         successBack()
 *     } catch (e) {
 *         errorBack()
 *     }
 * }
 */