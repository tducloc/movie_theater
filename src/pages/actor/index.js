import React from "react";
import useFetch from "../../hooks/useFetch";
import urlGenerator from "../../config/urlGenerator";
import { useParams } from "react-router-dom";
import Film from "../../components/Film/Film";
import { v4 as uuidv4 } from "uuid";
import "./index.scss"
export default function ActorPage() {
  const { id } = useParams();
  const {
    data: actor,
    loading: actorLoading,
  } = useFetch(urlGenerator.getActorDetailUrl(id));
  const {
    data: joinedMovie,
   
    loading: movieLoading,
  } = useFetch(urlGenerator.getJoinedMovieUrl(id));
  const {
    data: joinedTv,
    loading: tvLoading,
  } = useFetch(urlGenerator.getJoinedTvUrl(id));


  return (
    <div className="actor-page container">
      {!actorLoading && actor && (
        <div className="actor-page__left">
          <div className="actor-page__profile-image">
            <img
              src={urlGenerator.getImageUrl(actor.profile_path)}
              alt="actor-profile"
            />
          </div>

          <div className="actor-page__profile-info">
            <h2>Personal information</h2>

            <ul>
              <li>
                <h3>Career</h3>
                <p>{actor.known_for_department}</p>
              </li>

              <li>
                <h3>Gender</h3>
                <p>{actor.gender === 2 ? "Male" : "Female"}</p>
              </li>

              <li>
                <h3>Date of birth</h3>
                <p>{actor.birthday}</p>
              </li>

              <li>
                <h3>Place of birth</h3>
                <p>{actor.place_of_birth}</p>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="actor-page__right">
        {!actorLoading && actor && (
          <div className="actor-page__right-top">
            <h1 className="actor__name">{actor.name}</h1>

            <div className="actor__bio">
              <h2>Biography</h2>
              <p>{actor.biography}</p>
            </div>
          </div>
        )}

        {!movieLoading && joinedMovie && (
          <div className="actor-page__right-films">
            <h2>MOVIES</h2>

            <ul>
              {joinedMovie.cast.map((item) => (
                <Film film={item} mediaType={"movie"} key={item.id} />
              ))}
            </ul>
          </div>
        )}

        {!tvLoading && joinedTv && (
          <div className="actor-page__right-films">
            <h2>TV SERIES</h2>

            <ul>
              {joinedTv.cast.map((item) => (
                <Film film={item} mediaType={"tv"} key={uuidv4()} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
