import { Heart } from "lucide-react"
import Image from "next/image"

export default const Comments =()=>{
    return(
        <>
        {
            currentPosts.map((post) => (
                <div className=' py-5' key={post.id}>
                  <div className='flex  '>
                    {" "}
                    {post.creator_profile ? (
                      <Image
                        src={post.creator_profile}
                        alt='profile-image'
                        width={900}
                        height={900}
                        quality={75}
                        className='h-16 w-16 lg:h-16 lg:w-16 rounded-full object-cover'
                      />
                    ) : (
                      <Image
                        src='/images/a.jpg'
                        alt='profile-image'
                        width={900}
                        height={900}
                        className='h-16 w-16 rounded-full'
                      />
                    )}
                    <div className='pl-4'>
                      <span className='text-secondary text-sm opacity-70'>
                        {`Posted By: ${post.creator_name} ${timeAgo(
                          post.createdAt
                        )}`}{" "}
                        {post.categoryIds && post.categoryIds.length > 0
                          ? post.categoryIds.map((categoryId) => {
                              const category = categories.find(
                                (cat) => cat.id === categoryId
                              )
                              return category ? (
                                <span key={category.id}>{category.title}</span>
                              ) : null
                            })
                          : null}
                      </span>
                      <p className='my-2 font-semibold '>{post.content}</p>
    
                      {post.image && (
                        <Image
                          src={post.image}
                          alt='post-image'
                          width={900}
                          height={900}
                          className='object-fit mb-4 md:h-[65vh] w-auto'
                        />
                      )}
    
                      <div className='flex gap-4'>
                        <Heart
                          className='cursor-pointer'
                          // onClick={() => handleLike(post.id)}
                        />{" "}
                        <MessageCircle />{" "}
                        <AnswerSubmitModal>
                          <span
                            className='text-base cursor-pointer'
                            onClick={submitAnswer}
                          >
                            Give Answer
                          </span>
                        </AnswerSubmitModal>
                      </div>
                    </div>
                  </div>
    
                  <div className=' ml-20'>
                    {post.comments.map((comment) => (
                      <div key={comment.id}>
                        <div className='flex pt-4 '>
                          {comment.creator_profile ? (
                            <Image
                              src={comment.creator_profile}
                              alt='profile-image'
                              width={400}
                              height={400}
                              quality={75}
                              className='h-16 w-16 lg:h-16 lg:w-16 rounded-full object-cover'
                            />
                          ) : (
                           
                            <Image
                              src='/images/class.jpg'
                              alt='profile-image'
                              width={900}
                              height={900}
                              className='h-12 w-12 rounded-full'
                            />
                          )}
    
                          <div className='pl-4'>
                            <span className='text-secondary text-sm opacity-70'>
                              {`Commented By: ${comment.creator_name} ${timeAgo(
                                comment.createdAt
                              )}`}
                            </span>
                            <p className='my-2'>{comment.content}</p>
                            <div className='flex gap-4'>
                              <Heart
                                className='cursor-pointer'
                                // onClick={() => handleLike(post.id)}
                              />{" "}
                              <MessageCircle />{" "}
                              {/* <span
                                className="text-base cursor-pointer"
                                onClick={submitAnswer}
                              >
                                Give Answer
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                    </div>))
        }
        </>
        
    )
}