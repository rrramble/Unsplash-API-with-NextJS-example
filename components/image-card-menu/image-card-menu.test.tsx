import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ImageCardMenu from './image-card-menu';
import { internet, system } from 'faker';

const isLikedStates = [true, false]
const mockDownloadPhotoUrl = internet.url()
const mockOnClickLikeButton = jest.fn()
const mockOnClickDownload = jest.fn()
const mockPhotoProfileUrl = internet.url()
const mockSavingFilename = system.fileName()

const baseProps = {
  downloadPhotoUrl: mockDownloadPhotoUrl,
  onClickLikeButton: mockOnClickLikeButton,
  onClickDownload: mockOnClickDownload,
  photoProfileUrl: mockPhotoProfileUrl,
  savingFilename: mockSavingFilename,
}

describe('Component: <ImageCardMenu>', () => {
  test.concurrent.each(isLikedStates)('render without like', (isLiked) => {
    cleanup()
    const props = {
      ...baseProps,
      isLiked,
    }

    render(
        <ImageCardMenu
          {...props}
        />
    );

    const likeNode = screen.getByRole('checkbox', { name: /like status/i })
    expect(likeNode).toBeInTheDocument();
    expect(likeNode.getAttribute('checked')).toEqual(isLiked ? '' : null);

    const openPhotoNode = screen.getByRole('link', { name: /open profile of photo/i })
    expect(openPhotoNode).toBeInTheDocument();
    expect(openPhotoNode.getAttribute('href')).toEqual(mockPhotoProfileUrl);

    const downloadPhotoNode = screen.getByRole('link', { name: /download photo/i })
    expect(downloadPhotoNode).toBeInTheDocument();
    expect(downloadPhotoNode.getAttribute('href')).toEqual(mockDownloadPhotoUrl);
    expect(downloadPhotoNode.getAttribute('download')).toEqual(mockSavingFilename);
  })


  test.concurrent.each(isLikedStates)('clicks "like"', (isLiked) => {
    cleanup()
    jest.clearAllMocks()

    const props = {
      ...baseProps,
      isLiked,
    }

    render(
        <ImageCardMenu
          {...props}
        />
    );

    const likeNode = screen.getByRole('checkbox', { name: /like status/i })
    fireEvent.click(likeNode)

    expect(mockOnClickLikeButton).toBeCalledTimes(1);
  })

  test.concurrent.each(isLikedStates)('clicks "download"', (isLiked) => {
    mockOnClickDownload.mockReset()
    cleanup()
    const props = {
      ...baseProps,
      isLiked,
    }

    render(
        <ImageCardMenu
          {...props}
        />
    );

    const downloadPhotoNode = screen.getByRole('link', { name: /download photo/i })
    fireEvent.click(downloadPhotoNode)

    expect(mockOnClickDownload).toBeCalledTimes(1);
  })
})
